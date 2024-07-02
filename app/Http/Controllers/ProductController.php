<?php

namespace App\Http\Controllers;

use App\Models\Product;
use Illuminate\Http\Request;

class ProductController extends Controller
{

    public function index()
    {
       $products = Product::all();
       return response()->json($products);
    }


    public function create()
    {
        //
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        $product = new Product($validatedData);
        $product->save();

        return response()->json(['message' => 'Producto creado exitosamente'], 200);
        if ($product) {
            return response()->json(['message' => 'Producto creado exitosamente'], 200);
        } else {
            return response()->json(['errors' => $request->errors()], 422);
        }
    }

    public function show(string $id)
    {
        //
    }


    public function edit(string $id)
    {
        //
    }

    public function update(Request $request, string $id)
    {

          $validatedData = $request->validate([
            'name' => 'required',
            'price' => 'required|numeric',
        ]);

        $product = Product::findOrFail($id);

        $product->update($validatedData);


        return response()->json(['message' => 'Producto actualizado exitosamente']);
    }

    public function destroy(string $id)
    {
        $product = Product::findOrFail($id);
        $product->delete();

        return response()->json(['message' => 'Producto eliminado exitosamente']);
    }
}
