<?php

namespace App\Jobs;

use App\Services\CloudinaryService;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Foundation\Bus\Dispatchable;
use Illuminate\Queue\InteractsWithQueue;
use Illuminate\Queue\SerializesModels;
use Illuminate\Support\Facades\Log;

class ProcessMediaUpload implements ShouldQueue
{
    use Dispatchable, InteractsWithQueue, Queueable, SerializesModels;

    /**
     * Create a new job instance.
     *
     * @param  array<string, mixed>  $transformations
     */
    public function __construct(
        public string $publicId,
        public string $folder = 'general',
        public array $transformations = []
    ) {}

    /**
     * Execute the job.
     */
    public function handle(CloudinaryService $cloudinaryService): void
    {
        try {
            Log::info("Processing media asset background optimization for {$this->publicId} in folder {$this->folder}");

            // Generate optimized responsive URL variant
            $optimizedUrl = $cloudinaryService->url($this->publicId, array_merge([
                'fetch_format' => 'auto',
                'quality' => 'auto',
            ], $this->transformations));

            Log::info("Media asset {$this->publicId} ready: {$optimizedUrl}");
        } catch (\Throwable $e) {
            Log::error("Failed processing media upload for {$this->publicId}: " . $e->getMessage());
            $this->fail($e);
        }
    }
}
