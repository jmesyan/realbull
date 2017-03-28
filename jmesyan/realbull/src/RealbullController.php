<?php
/**
 * Created by PhpStorm.
 * User: Jmesyan
 * Date: 2017/3/28
 * Time: 15:57
 */
namespace Jmesyan\Realbull;
use App\Http\Controllers\Controller;
use Carbon\Carbon;

class RealbullController extends Controller{
    public function index($timezone=null){
        $current_time = ($timezone)
            ? Carbon::now(str_replace('-', '/', $timezone))
            : Carbon::now();
        return view('realbull::realbull', compact('current_time'));
    }
}