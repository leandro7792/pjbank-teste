<?php

namespace App\Http\Controllers;

use App\Inventario;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class InventarioController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index(Request $request)
    {

        $filtro = $request->input('filtro');
        $per_page = $request->input('per_page');

        if ($filtro) {
            $result =  Inventario::where('descricaoProduto', 'LIKE', '%'.$filtro.'%')->orWhere('id', '=', $filtro);
            return $result->paginate($per_page);
        }

        return Inventario::paginate($per_page);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        $attributes = [
            'descricaoProduto' => 'Descrição do Produto',
            'qtdeProduto' => 'Quantidade do Produto',
            'precoProduto' => 'Preço do Produto'
        ];

        $validator = Validator::make($request->all(), [
            'descricaoProduto' => 'required|max:255',
            'qtdeProduto' => 'required|numeric',
            'precoProduto' => 'required|numeric'
        ], [], $attributes);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $inventario = new Inventario();
        $inventario->fill($validator->validated());
        $inventario->save();

        return response()->json($inventario, 201);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\inventario  $inventario
     * @return \Illuminate\Http\Response
     */
    public function show(inventario $inventario)
    {
        return response()->json($inventario, 200);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  \Illuminate\Http\Request  $request
     * @param  \App\inventario  $inventario
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, inventario $inventario)
    {
        $attributes = [
            'descricaoProduto' => 'Descrição do Produto',
            'qtdeProduto' => 'Quantidade do Produto',
            'precoProduto' => 'Preço do Produto'
        ];

        $validator = Validator::make($request->all(), [
            'descricaoProduto' => 'string|max:255',
            'qtdeProduto' => 'numeric',
            'precoProduto' => 'numeric'
        ], [], $attributes);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $inventario->fill($validator->validated());
        $inventario->save();

        return response()->json($inventario, 200);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\inventario  $inventario
     * @return \Illuminate\Http\Response
     */
    public function destroy(inventario $inventario)
    {
        $inventario->delete();

        return response()->json($inventario,200);
    }
}
