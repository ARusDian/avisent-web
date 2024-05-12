<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\ManualLog;
use Illuminate\Http\Request;
use App\Http\Resources\ManualLogResource;
use Illuminate\Support\Facades\Validator;

class ManualLogController extends Controller
{

    public function index()
    {
        $mlog = ManualLog::orderBy('id_manual_log')->get();

        return new ManualLogResource(true, 'Manual log list', $mlog);
    }

    public function store(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'user_id' => 'required',
            'turret_id' => 'required',
            'start_date' => 'required|string',
            'end_date' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $mlog = ManualLog::create([
            'user_id'     => $request->user_id,
            'turret_id'     => $request->turret_id,
            'start_date'   => $request->start_date,
            'end_date'   => $request->end_date,
        ]);

        return new ManualLogResource(true, 'Manual log data added successfully', $mlog);
    }
}
