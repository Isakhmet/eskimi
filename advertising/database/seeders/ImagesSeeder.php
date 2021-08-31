<?php

namespace Database\Seeders;

use App\Models\Image;
use Illuminate\Database\Seeder;

class ImagesSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        Image::insert(
            [
                [
                    'id' => 1,
                    'name' => 'lc-2012.jpg',
                    'path' => 'storage/images/lc-2012.jpg'
                ],
                [
                    'id' => 2,
                    'name' => 'lc-2021.jpg',
                    'path' => 'storage/images/lc-2021.jpg'
                ],
                [
                    'id' => 3,
                    'name' => 'sc-2021.jpg',
                    'path' => 'storage/images/sc-2021.jpg'
                ],
            ]
        );
    }
}
