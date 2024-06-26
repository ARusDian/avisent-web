<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('turrets', function (Blueprint $table) {
            $table->id('id_turret');
            $table->tinyInteger('image_id');
            $table->text('description');
            $table->string('server_url');
            $table->string('turret_url');
            $table->text('location');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('turrets');
    }
};
