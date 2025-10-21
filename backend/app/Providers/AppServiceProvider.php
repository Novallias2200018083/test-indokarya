<?php

namespace App\Providers;

use Illuminate\Foundation\Support\Providers\AuthServiceProvider as ServiceProvider;
use Illuminate\Support\Facades\Gate;
use App\Models\Item;
use App\Policies\ItemPolicy;

class AuthServiceProvider extends ServiceProvider
{
    protected $policies = [
        Item::class => ItemPolicy::class,
    ];

    public function boot(): void
    {
        $this->registerPolicies();
    }
}