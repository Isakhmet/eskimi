<?php

namespace Database\Seeders;

use App\Models\AdvertisingImage;
use Illuminate\Database\Seeder;

class AdvertisingImageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        AdvertisingImage::insert(
            [
                [
                    'image_id'       => 1,
                    'advertising_id' => 1,
                ],
                [
                    'image_id'       => 2,
                    'advertising_id' => 1,
                ],
                [
                    'image_id'       => 3,
                    'advertising_id' => 1,
                ],
                [
                    'image_id'       => 1,
                    'advertising_id' => 2,
                ],
                [
                    'image_id'       => 2,
                    'advertising_id' => 2,
                ],
                [
                    'image_id'       => 3,
                    'advertising_id' => 2,
                ],
            ]
        );
    }
}
