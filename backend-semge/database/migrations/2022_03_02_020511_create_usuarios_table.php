<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

class CreateUsuariosTable extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('usuarios', function (Blueprint $table) {
            $table->id();
            $table->char('nome', 100);
            $table->char('email', 100);
            $table->char('telefone', 100);
            $table->char('senha', 100);
            $table->char('cpf', 20);
            $table->timestamp('dthr_criacao', $precision = 0)->default('CURRENT_TIMESTAMP');
            $table->timestamp('dthr_atualizacao', $precision = 0);
            $table->integer('id_perfil')->default(1);
            $table->foreign('id_perfil')->references('id')->on('perfils');
            $table->char('cep', 11);
            $table->date('data_nascimento', $precision = 0);
            $table->char('estado', 11);
            $table->char('pais', 11);
            $table->char('cidade', 11);
            $table->char('logradouro', 100);
            $table->char('numero', 20);
            $table->char('complemento', 100);
            $table->timestamps();
           
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('usuarios');
    }
}
