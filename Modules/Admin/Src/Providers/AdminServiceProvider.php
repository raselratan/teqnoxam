<?php

namespace Admin\Src\Providers;

use Admin\Src\Http\Middleware\EnsureUserIsAdmin;
use Illuminate\Routing\Router;
use Illuminate\Support\ServiceProvider;

class AdminServiceProvider extends ServiceProvider
{
    /**
     * Register any Services
     */
    public function register(): void
    {
        $this->registerRepositories();
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        $this->loadMigrationsFrom(__DIR__ . '/../../Database/Migrations');
        $this->app->register(RouteServiceProvider::class);
        $this->mergeConfigFrom(__DIR__ . '/../../Config/admin.php', 'config');
        $this->registerMiddleware();
    }

    protected function registerRepositories(): void {}

    protected function registerMiddleware(): void
    {
        /** @var \Illuminate\Routing\Router $router */
        $router = $this->app->make(Router::class);

        // Bind custom middleware alias
        $router->aliasMiddleware('admin', EnsureUserIsAdmin::class);
    }
}
