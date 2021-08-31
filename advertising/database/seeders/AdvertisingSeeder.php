<?php

namespace Database\Seeders;

use App\Models\Advertising;
use Illuminate\Database\Seeder;
use Illuminate\Support\Carbon;

class AdvertisingSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Advertising::insert(
            [
                [
                    'id'           => 1,
                    'name'         => 'Advertising 1',
                    'from'         => Carbon::now()->format('Y-m-d H:i:s'),
                    'to'           => Carbon::now()->addDay()->format('Y-m-d H:i:s'),
                    'total_budget' => 200,
                    'daily_budget' => 100,
                ],
                [
                    'id'           => 2,
                    'name'         => 'Advertising 2',
                    'from'         => Carbon::now()->format('Y-m-d H:i:s'),
                    'to'           => Carbon::now()->addDay()->format('Y-m-d H:i:s'),
                    'total_budget' => 50.5,
                    'daily_budget' => 25.25,
                ]
            ]
        );
    }
}
