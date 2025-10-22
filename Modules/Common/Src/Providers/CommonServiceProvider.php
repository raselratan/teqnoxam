<?php

namespace Common\Src\Providers;

use Illuminate\Support\ServiceProvider;
use Inertia\Inertia;

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
        Inertia::share([
            "role" => fn() => auth()?->user()->role ?? null,
            "username" => fn() => auth()?->user()->name ?? null,
        ]);
    }

    protected function registerRepositories(): void
    {
        $this->app->bind(
            \Common\Src\Repositories\Contracts\UserRepositoryInterface::class,
            \Common\Src\Repositories\UserRepository::class
        );

        $this->app->bind(
            \Common\Src\Repositories\Contracts\CategoryRepositoryInterface::class,
            \Common\Src\Repositories\CategoryRepository::class
        );

        $this->app->bind(
            \Common\Src\Repositories\Contracts\PostRepositoryInterface::class,
            \Common\Src\Repositories\PostRepository::class
        );

        $this->app->bind(
            \Common\Src\Repositories\Contracts\InstituteRepositoryInterface::class,
            \Common\Src\Repositories\InstituteRepository::class
        );

        $this->app->bind(
            \Common\Src\Repositories\Contracts\ExamYearRepositoryInterface::class,
            \Common\Src\Repositories\ExamYearRepository::class
        );
    }
}
