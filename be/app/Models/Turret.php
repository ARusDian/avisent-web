<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Turret extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_turret';
    protected $fillable= [
        'image_id',
        'description',
        'secret_url',
        'turret_url',
        'location',
    ];

    public $timestamps = false;

    public function file(): HasOne
    {
        return $this->hasOne(File::class, 'id_file', 'image_id');
    }

    public function log(): HasMany
    {
        return $this->hasMany(Log::class, 'turret_id', 'id_turret');
    }

    public function mlog(): HasMany
    {
        return $this->hasMany(ManualLog::class, 'turret_id', 'id_turret');
    }
}
