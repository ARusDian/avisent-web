<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Log extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_log';
    protected $fillable= [
        'turret_id',
        'image_id',
        'location',
        'object_type',
        'shot_date',
    ];

    public $timestamps = false;

    public function file(): HasOne
    {
        return $this->hasOne(File::class, 'id_file', 'image_id');
    }

    public function turret(): BelongsTo
    {
        return $this->belongsTo(Turret::class, 'id_turret', 'turret_id');
    }
}
