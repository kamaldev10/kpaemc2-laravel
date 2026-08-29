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

        $members = Member::with('division')
            ->pengurus()
            ->orderBy('sort_order')
            ->orderBy('name')
            ->get();

        return Inertia::render('Public/Structure/Index', [
            'aboutInfo' => $aboutInfo,
            'divisions' => $divisions,
            'members' => $members,
        ]);
    }
}
