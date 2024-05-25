<?php

namespace Database\Factories;

use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;

class UserFactory extends Factory
{
    protected $model = User::class;

    public function definition() : array
    {
        return [
            'name' => $this->faker->name,
            'type' => $this->faker->numberBetween(1, 3),
            'password' => Hash::make('12121212'),
        ];
    }
}
