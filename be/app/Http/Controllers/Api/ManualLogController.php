<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ManualLog;
use Illuminate\Http\Request;
use App\Http\Resources\ManualLogResource;

class ManualLogController extends Controller
{

    public function index()
    {
        $mlog = ManualLog::latest()->paginate(5);

        return new ManualLogResource(true, 'List Manual Log', $mlog);
    }
}
