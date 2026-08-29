<?php

namespace App\Services;

use Exception;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CloudinaryService
{
    public const FOLDER_POSTS = 'post-images';
    public const FOLDER_MEMBERS = 'member-images';
    public const FOLDER_EVENTS = 'event-images';
    public const FOLDER_GALLERIES = 'gallery-images';
    public const FOLDER_ABOUT = 'about-images';

    protected string $cloudName;
    protected ?string $apiKey;
    protected ?string $apiSecret;
    protected string $defaultFolder;

    public function __construct()
    {
        $this->cloudName = (string) Config::get('services.cloudinary.cloud_name', '');
        $this->apiKey = Config::get('services.cloudinary.api_key');
        $this->apiSecret = Config::get('services.cloudinary.api_secret');
        $this->defaultFolder = (string) Config::get('services.cloudinary.folder', 'kpa_emc2');
    }

    /**
     * Upload an image/file to Cloudinary.
     *
     * @param  UploadedFile|string  $file  UploadedFile instance, local file path, or base64 string
     * @param  string|null  $folder  Target folder on Cloudinary
     * @param  array  $tags  Optional tags for organization
     * @return array{url: string, secure_url: string, public_id: string, format: string, width?: int, height?: int}
     *
     * @throws Exception
     */
    public function upload(UploadedFile|string $file, ?string $folder = null, array $tags = []): array
    {
        $targetFolder = $folder ?? $this->defaultFolder;
        $timestamp = time();

        // If credentials are not configured (e.g., in unit testing without live API), return mock format
        if (empty($this->cloudName) || empty($this->apiKey) || empty($this->apiSecret)) {
            $mockId = $targetFolder . '/' . uniqid('mock_img_', true);
            return [
                'url' => "http://res.cloudinary.com/demo/image/upload/{$mockId}.jpg",
                'secure_url' => "https://res.cloudinary.com/demo/image/upload/{$mockId}.jpg",
                'public_id' => $mockId,
                'format' => 'jpg',
                'width' => 1200,
                'height' => 800,
            ];
        }

        $params = [
            'folder' => $targetFolder,
            'timestamp' => $timestamp,
        ];

        if (! empty($tags)) {
            $params['tags'] = implode(',', $tags);
        }

        ksort($params);
        $signatureString = http_build_query($params, '', '&') . $this->apiSecret;
        $signature = sha1($signatureString);

        $params['api_key'] = $this->apiKey;
        $params['signature'] = $signature;

        $request = Http::timeout(30);

        if ($file instanceof UploadedFile) {
            $response = $request->attach(
                'file',
                file_get_contents($file->getRealPath()),
                $file->getClientOriginalName()
            )->post("https://api.cloudinary.com/v1_1/{$this->cloudName}/image/upload", $params);
        } else {
            $params['file'] = $file;
            $response = $request->post("https://api.cloudinary.com/v1_1/{$this->cloudName}/image/upload", $params);
        }

        if (! $response->successful()) {
            Log::error('Cloudinary upload failed', [
                'status' => $response->status(),
                'body' => $response->body(),
            ]);
            throw new Exception('Failed to upload image to Cloudinary: ' . ($response->json('error.message') ?? 'Unknown error'));
        }

        $data = $response->json();

        return [
            'url' => $data['url'] ?? '',
            'secure_url' => $data['secure_url'] ?? '',
            'public_id' => $data['public_id'] ?? '',
            'format' => $data['format'] ?? 'webp',
            'width' => $data['width'] ?? 0,
            'height' => $data['height'] ?? 0,
        ];
    }

    /**
     * Delete an image from Cloudinary by public ID.
     *
     * @param  string  $publicId
     * @return bool
     */
    public function delete(string $publicId): bool
    {
        if (empty($this->cloudName) || empty($this->apiKey) || empty($this->apiSecret)) {
            return true;
        }

        $timestamp = time();
        $params = [
            'public_id' => $publicId,
            'timestamp' => $timestamp,
        ];

        ksort($params);
        $signatureString = http_build_query($params, '', '&') . $this->apiSecret;
        $signature = sha1($signatureString);

        $params['api_key'] = $this->apiKey;
        $params['signature'] = $signature;

        try {
            $response = Http::timeout(15)->post("https://api.cloudinary.com/v1_1/{$this->cloudName}/image/destroy", $params);
            $result = $response->json('result');
            return $result === 'ok' || $result === 'not found';
        } catch (Exception $e) {
            Log::error('Cloudinary delete exception', ['error' => $e->getMessage()]);
            return false;
        }
    }

    /**
     * Build an optimized Cloudinary delivery URL with transformations.
     *
     * @param  string  $publicId
     * @param  array<string>|string  $transformations  e.g. 'f_auto,q_auto,w_800' or ['f_auto', 'q_auto']
     * @return string
     */
    public function url(string $publicId, array|string $transformations = ['f_auto', 'q_auto']): string
    {
        $cloud = ! empty($this->cloudName) ? $this->cloudName : 'demo';
        $transforms = is_array($transformations) ? implode(',', $transformations) : $transformations;
        $transforms = trim($transforms, '/');

        if (empty($transforms)) {
            $transforms = 'f_auto,q_auto';
        }

        // Clean publicId if it already starts with slash
        $cleanId = ltrim($publicId, '/');

        return "https://res.cloudinary.com/{$cloud}/image/upload/{$transforms}/{$cleanId}";
    }
}
