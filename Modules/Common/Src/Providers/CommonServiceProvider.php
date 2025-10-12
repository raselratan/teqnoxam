<?php

namespace Common\Src\Providers;

use Illuminate\Support\ServiceProvider;

class CommonServiceProvider extends ServiceProvider
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
        $this->mergeConfigFrom(__DIR__ . '/../../Config/common.php', 'config');
    }

    protected function registerRepositories(): void {
        $this->app->bind(
            \Common\Src\Repositories\Contracts\UserRepositoryInterface::class,
            \Common\Src\Repositories\UserRepository::class
        );  
    }
}
