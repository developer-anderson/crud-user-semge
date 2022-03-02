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
            $table->dateTime('dthr_criacao', $precision = 0);
            $table->dateTime('dthr_atualizacao', $precision = 0);
            $table->integer('id_perfil');
            $table->foreign('id_perfil')->references('id')->on('perfils');
            $table->char('cep', 11);
            $table->date('data_nascimento');
            $table->char('estado', 11);
            $table->char('pais', 11);
            $table->char('cidade', 11);
            $table->char('logradouro', 100);
            $table->char('numero', 5);
            $table->char('complemento', 100);
           
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
