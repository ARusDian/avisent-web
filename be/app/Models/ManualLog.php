<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class ManualLog extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_manual_log';
    protected $fillable= [
        'user_id',
        'turret_id',
        'start_date',
        'end_date',
    ];

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'user_id', 'id_user');
    }

    public function turret(): BelongsTo
    {
        return $this->belongsTo(Turret::class, 'turret_id', 'id_turret');
    }

    public $timestamps = false;
}
