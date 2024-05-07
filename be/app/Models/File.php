<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class File extends Model
{
    use HasFactory;

    protected $primaryKey = 'id_file';

    protected $fillable= [
        'path',
        'type',
    ];

    public function turret(): BelongsTo
    {
        return $this->belongsTo(Turret::class, 'image_id', 'id_file');
    }
}
