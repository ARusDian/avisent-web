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
        $mlog = ManualLog::orderBy('id_manual_log')->get();

        return new ManualLogResource(true, 'List manual Log', $mlog);
    }
}
