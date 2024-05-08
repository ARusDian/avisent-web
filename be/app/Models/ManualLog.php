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

    public $timestamps = false;

    public function turret(): BelongsTo
    {
        return $this->belongsTo(Turret::class, 'id_turret', 'turret_id');
    }

    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class, 'id_user', 'user_id');
    }
}
