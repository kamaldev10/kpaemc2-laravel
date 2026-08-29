<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('registrations', function (Blueprint $table) {
            $table->id();
            $table->foreignId('event_id')->constrained('events')->cascadeOnDelete();
            $table->string('registration_code', 30)->unique();
            $table->string('full_name', 255);
            $table->string('email', 255);
            $table->string('phone', 20);
            $table->string('gender', 10)->nullable();
            $table->date('birth_date')->nullable();
            $table->string('place_of_birth', 150)->nullable();
            $table->text('address')->nullable();
            $table->string('institution', 255)->nullable();
            $table->string('major', 255)->nullable();
            $table->string('occupation', 255)->nullable();
            $table->text('motivation')->nullable();
            $table->string('photo_url', 500)->nullable();
            $table->string('photo_public_id', 300)->nullable();
            $table->string('document_url', 500)->nullable();
            $table->string('document_public_id', 300)->nullable();
            $table->jsonb('extra_data')->nullable();
            $table->string('payment_proof_url', 500)->nullable();
            $table->string('payment_proof_public_id', 300)->nullable();
            $table->string('status', 50)->default('pending');
            $table->text('reviewer_notes')->nullable();
            $table->boolean('is_active')->default(true);
            $table->foreignId('created_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->foreignId('updated_by')->nullable()->index()->constrained('users')->nullOnDelete();
            $table->timestampsTz();

            $table->index(['event_id', 'status']);
            $table->index('email');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('registrations');
    }
};
