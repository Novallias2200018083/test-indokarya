<?php

namespace App\Http\Controllers;

use App\Models\Item;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;
use Illuminate\Validation\ValidationException; // Untuk penanganan error validasi 422

class ItemController extends Controller
{
    // Konstruktor dihilangkan karena middleware sudah dihandle di routes/api.php

    public function index(): JsonResponse
    {
        try {
            Log::info('Fetching items for user: ' . Auth::id());
            
            // Perbaikan: Method items() di Model User kini sudah ada!
            $items = Auth::user()->items()->latest()->get(); 
            
            Log::info('Items fetched successfully: ' . $items->count() . ' items');
            
            return response()->json([
                'success' => true,
                'data' => $items,
                'message' => 'Items fetched successfully'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching items: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch items',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function store(Request $request): JsonResponse
    {
        try {
            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $item = Auth::user()->items()->create([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            Log::info('Item created successfully: ' . $item->id);

            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Item created successfully'
            ], 201);

        } catch (ValidationException $e) {
             return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error creating item: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to create item',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function show(Item $item): JsonResponse
    {
        try {
            if ($item->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to view this item'
                ], 403);
            }
            
            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Item fetched successfully'
            ]);
            
        } catch (\Exception $e) {
            Log::error('Error fetching item: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to fetch item',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function update(Request $request, Item $item): JsonResponse
    {
        try {
            if ($item->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to update this item'
                ], 403);
            }

            $request->validate([
                'title' => 'required|string|max:255',
                'description' => 'nullable|string',
            ]);

            $item->update([
                'title' => $request->title,
                'description' => $request->description,
            ]);

            Log::info('Item updated successfully: ' . $item->id);

            return response()->json([
                'success' => true,
                'data' => $item,
                'message' => 'Item updated successfully'
            ]);

        } catch (ValidationException $e) {
             return response()->json([
                'success' => false,
                'message' => 'Validation error',
                'errors' => $e->errors()
            ], 422);
        } catch (\Exception $e) {
            Log::error('Error updating item: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to update item',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }

    public function destroy(Item $item): JsonResponse
    {
        try {
            if ($item->user_id !== Auth::id()) {
                return response()->json([
                    'success' => false,
                    'message' => 'Unauthorized to delete this item'
                ], 403);
            }
            
            $item->delete();

            Log::info('Item deleted successfully: ' . $item->id);

            return response()->json([
                'success' => true,
                'message' => 'Item deleted successfully'
            ]);

        } catch (\Exception $e) {
            Log::error('Error deleting item: ' . $e->getMessage());
            
            return response()->json([
                'success' => false,
                'message' => 'Failed to delete item',
                'error' => config('app.debug') ? $e->getMessage() : 'Internal server error'
            ], 500);
        }
    }
}