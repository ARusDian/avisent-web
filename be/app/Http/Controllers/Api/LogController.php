<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Log;
use Illuminate\Http\Request;
use App\Http\Resources\LogResource;

class LogController extends Controller
{
    public function index()
    {
        $log = Log::latest()->paginate(5);

        return new LogResource(true, 'List Log', $log);
    }

}
