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
        Schema::table('team__invites', function (Blueprint $table) {
            $table->unsignedBigInteger("teamId");
            $table->foreign('teamId')->references('id')->on('teams')->onDelete('cascade');
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('team__invites', function (Blueprint $table) {
            $table->dropForeign(['teamId']);
            $table->dropColumn('teamId');
        });
    }
};
