<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasFactory, Notifiable, HasApiTokens;


    protected $primaryKey = 'id_user';
    protected $fillable = [
        'name',
        'password',
        'type',
    ];

    protected function casts(): array
    {
        return [
            'password' => 'hashed',
        ];
    }

    public $timestamps = false;

    public function mlog(): HasMany
    {
        return $this->hasMany(ManualLog::class, 'user_id', 'id_user');
    }
}
