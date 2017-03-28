<?php

namespace Jmesyan\Realbull;

use Illuminate\Support\ServiceProvider;

class RealbullServiceProvider extends ServiceProvider
{
    /**
     * Bootstrap the application services.
     *
     * @return void
     */
    public function boot()
    {
        //
        $this->loadViewsFrom(__DIR__.'/views', 'realbull');

        $this->publishes([
            __DIR__.'/views' => base_path('resources/views/jmesyan/view'),
        ]);
    }

    /**
     * Register the application services.
     *
     * @return void
     */
    public function register()
    {
        //
        include __DIR__."/routes.php";
        $this->app->make('Jmesyan\Realbull\RealbullController');
    }
}
