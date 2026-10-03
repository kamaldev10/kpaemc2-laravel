<?php

namespace App\Http\Controllers\Public;

use App\Http\Controllers\Controller;
use App\Models\AboutInfo;
use App\Models\Division;
use App\Models\Member;
use Inertia\Inertia;
use Inertia\Response;

class MemberController extends Controller
{
    /**
     * Display the organizational structure and member directory.
     */
    public function index(): Response
    {
        $aboutInfo = AboutInfo::where('is_active', true)->first();

        $divisions = Division::where('is_active', true)
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'slug', 'name', 'icon_name']);

        $members = Member::with(['division:id,name,slug,icon_name'])
            ->pengurus()
            ->orderByDesc('batch_year')
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get(['id', 'member_number', 'name', 'division_id', 'position', 'batch_year', 'major', 'bio', 'avatar_url', 'is_pengurus', 'sort_order', 'status']);

        return Inertia::render('Public/Structure/Index', [
            'aboutInfo' => $aboutInfo,
            'divisions' => $divisions,
            'members' => $members,
        ]);
    }
}
