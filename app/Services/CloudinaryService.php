<?php

namespace App\Services;

use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class CloudinaryService
{
	protected string $cloudName;

	protected string $apiKey;

	protected string $apiSecret;

	protected string $folder;

	public function __construct()
	{
		$this->cloudName = config('services.cloudinary.cloud_name') ?? '';
		$this->apiKey = config('services.cloudinary.api_key') ?? '';
		$this->apiSecret = config('services.cloudinary.api_secret') ?? '';
		$this->folder = config('services.cloudinary.folder', 'kpa_emc2');
	}

	/**
	 * Upload file ke Cloudinary
	 */
	public function upload(UploadedFile|string $file, ?string $subFolder = null): ?array
	{
		$targetFolder = $subFolder ? "{$this->folder}/{$subFolder}" : $this->folder;
		$timestamp = time();

		// Generate signature untuk signed upload aman
		$paramsToSign = [
			'folder' => $targetFolder,
			'timestamp' => $timestamp,
		];
		ksort($paramsToSign);

		$signatureString = collect($paramsToSign)
			->map(fn($v, $k) => "$k=$v")
			->implode('&') . $this->apiSecret;

		$signature = sha1($signatureString);

		$url = "https://api.cloudinary.com/v1_1/{$this->cloudName}/image/upload";

		$request = Http::asMultipart();

		if ($file instanceof UploadedFile) {
			$request->attach('file', file_get_contents($file->getRealPath()), $file->getClientOriginalName());
		} else {
			// Jika path string
			$request->attach('file', file_get_contents($file), basename($file));
		}

		$response = $request->post($url, [
			'api_key' => $this->apiKey,
			'timestamp' => $timestamp,
			'folder' => $targetFolder,
			'signature' => $signature,
		]);

		if ($response->successful()) {
			$data = $response->json();

			return [
				'public_id' => $data['public_id'],
				'url' => $data['secure_url'],
				'format' => $data['format'] ?? null,
				'width' => $data['width'] ?? null,
				'height' => $data['height'] ?? null,
				'optimized_url' => $this->getOptimizedUrl($data['public_id']),
			];
		}

		Log::error('Cloudinary upload failed: ' . $response->body());

		return null;
	}

	/**
	 * Hapus gambar dari Cloudinary berdasarkan public_id
	 */
	public function delete(string $publicId): bool
	{
		$timestamp = time();
		$signature = sha1("public_id={$publicId}&timestamp={$timestamp}" . $this->apiSecret);

		$response = Http::asForm()->post("https://api.cloudinary.com/v1_1/{$this->cloudName}/image/destroy", [
			'public_id' => $publicId,
			'api_key' => $this->apiKey,
			'timestamp' => $timestamp,
			'signature' => $signature,
		]);

		return $response->successful();
	}

	/**
	 * Generate URL dengan auto WebP & dynamic crop
	 */
	public function getOptimizedUrl(string $publicId, int $width = 1200, int $height = 800): string
	{
		return "https://res.cloudinary.com/{$this->cloudName}/image/upload/f_auto,q_auto,w_{$width},c_limit/{$publicId}";
	}
}
