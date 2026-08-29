<?php

namespace Database\Seeders;

use App\Models\Division;
use App\Models\Member;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;

class MemberSeeder extends Seeder
{
	public function run(): void
	{
		$sqlPath = base_path('database/Member_rows.sql');

		if (! File::exists($sqlPath)) {
			$this->command->error("File database/Member_rows.sql not found!");
			return;
		}

		$sql = File::get($sqlPath);

		$prefix = 'INSERT INTO "public"."Member" ("id", "name", "nomorAnggota", "jurusan", "nomorTelepon", "status", "avatarUrl", "createdAt") VALUES ';
		if (str_starts_with($sql, $prefix)) {
			$valuesStr = substr($sql, strlen($prefix));
		} else {
			$pos = strpos($sql, 'VALUES');
			$valuesStr = substr($sql, $pos + 6);
		}

		$valuesStr = trim($valuesStr);
		$valuesStr = rtrim($valuesStr, ';');

		$pattern = '/\(\s*(\d+)\s*,\s*\'((?:[^\']|\'\')*)\'\s*,\s*\'((?:[^\']|\'\')*)\'\s*,\s*(null|\'(?:[^\']|\'\')*\')\s*,\s*(null|\'(?:[^\']|\'\')*\')\s*,\s*\'((?:[^\']|\'\')*)\'\s*,\s*(null|\'(?:[^\']|\'\')*\')\s*,\s*\'((?:[^\']|\'\')*)\'\s*\)/u';

		preg_match_all($pattern, $valuesStr, $matches, PREG_SET_ORDER);

		$this->command->info(sprintf('Parsed %d member records from Member_rows.sql', count($matches)));

		// Retrieve division IDs for mapping
		$divisions = Division::all()->keyBy('slug');
		$kaderisasiId = $divisions->get('kaderisasi')?->id;
		$sklhId = $divisions->get('sklh')?->id;
		$litbangId = $divisions->get('litbang')?->id;
		$karataId = $divisions->get('karata')?->id;

		foreach ($matches as $row) {
			$numericId = (int) $row[1];
			$name = str_replace("''", "'", $row[2]);
			$memberNumber = str_replace("''", "'", $row[3]);

			$majorRaw = $row[4];
			$major = ($majorRaw === 'null' || trim($majorRaw, "'") === '')
				? null
				: str_replace("''", "'", trim($majorRaw, "'"));

			$phoneRaw = $row[5];
			$phone = ($phoneRaw === 'null' || trim($phoneRaw, "'") === '')
				? null
				: str_replace("''", "'", trim($phoneRaw, "'"));

			$status = str_replace("''", "'", $row[6]);

			$avatarRaw = $row[7];
			$avatarUrl = ($avatarRaw === 'null' || trim($avatarRaw, "'") === '')
				? null
				: str_replace("''", "'", trim($avatarRaw, "'"));

			$createdAt = Carbon::parse($row[8]);

			// Extract batch year from member number (e.g. '001/KPA EMC²/1986' -> 1986)
			$batchYear = null;
			if (preg_match('/\/(\d{4})$/', $memberNumber, $yearMatch)) {
				$batchYear = (int) $yearMatch[1];
			}

			// Extract Cloudinary public ID if applicable
			$avatarPublicId = null;
			if (! empty($avatarUrl) && str_contains($avatarUrl, 'cloudinary.com')) {
				if (preg_match('/\/upload\/(?:v\d+\/)?(.+?)(?:\.[^.]+)?$/', $avatarUrl, $pidMatch)) {
					$avatarPublicId = $pidMatch[1];
				}
			}

			// Determine if member is active board / pengurus
			$isPengurus = false;
			$position = null;
			$divisionId = null;

			$lowerName = strtolower($name);
			if (str_contains($lowerName, 'desti seri')) {
				$isPengurus = true;
				$position = 'Ketua Umum';
			} elseif (str_contains($lowerName, 'syahren nabila')) {
				$isPengurus = true;
				$position = 'Sekretaris Umum';
			} elseif (str_contains($lowerName, 'dewi lestari')) {
				$isPengurus = true;
				$position = 'Staff Ahli Arsip Data & RT';
			} elseif (str_contains($lowerName, 'rina noviana')) {
				$isPengurus = true;
				$position = 'Bendahara Umum';
			} elseif (str_contains($lowerName, 'ali musthafa')) {
				$isPengurus = true;
				$position = 'Kepala Divisi Litbang';
				$divisionId = $litbangId;
			} elseif (str_contains($lowerName, 'muhammad farhan')) {
				$isPengurus = true;
				$position = 'Kepala Divisi Karata';
				$divisionId = $karataId;
			}

			Member::updateOrCreate(
				['member_number' => $memberNumber],
				[
					'name' => $name,
					'division_id' => $divisionId,
					'position' => $position,
					'batch_year' => $batchYear,
					'major' => $major,
					'phone' => $phone,
					'email' => null,
					'status' => $status,
					'bio' => null,
					'avatar_url' => $avatarUrl,
					'avatar_public_id' => $avatarPublicId,
					'is_pengurus' => $isPengurus,
					'sort_order' => $numericId,
					'is_active' => $status !== 'Non Aktif',
					'created_at' => $createdAt,
					'updated_at' => $createdAt,
				]
			);
		}

		$this->command->info('Member seeding completed successfully!');
	}
}
