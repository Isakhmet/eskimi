<?php

namespace Tests\Feature;

use App\Models\Advertising;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Foundation\Testing\WithFaker;
use Illuminate\Http\UploadedFile;
use Tests\TestCase;
use Illuminate\Testing\Fluent\AssertableJson;

class AdvertisingTest extends TestCase
{
    /**
     * @test
     */
    public function user_can_create_advertising()
    {
        $file = new UploadedFile('storage/app/public/images/lc-2012.jpg', 'lc-2012.jpg');

        $response = $this->post(
            '/api/advertising',
            [
                'name'                         => 'Test',
                'from'                         => '2021-08-01T08:41',
                'to'                           => '2021-08-06T08:41',
                'totalBudget'                  => 1000,
                'dailyBudget'                  => 100,
                $file->getClientOriginalName() => $file,
            ]
        );


        $response->assertStatus(200);
        $response->assertJson(
            function (AssertableJson $json) {
                return $json->whereType('success', 'boolean');
            }
        );
    }

    /**
     * @test
     */
    public function user_can_update_advertising()
    {
        $model = Advertising::with('images')
                            ->first()
        ;

        $response = $this->post(
            '/api/advertising/update',
            [
                'id'          => $model->id,
                'name'        => 'Updated Name',
                'from'        => '2021-08-01T08:41',
                'to'          => '2021-08-06T08:41',
                'totalBudget' => 2000.5,
                'dailyBudget' => 200.1,
            ]
        );

        $response->assertStatus(200);
        $response->assertJson(
            function (AssertableJson $json) {
                return $json->whereType('success', 'boolean');
            }
        );
    }

    /**
     * @test
     */
    public function user_can_get_all_record()
    {
        $response = $this->get(
            '/api/advertising'
        );

        $response->assertStatus(200);
        $response->assertJson(
            function (AssertableJson $json) {
                return $json->whereAllType(
                    [
                        '0.name'         => 'string',
                        '0.from'         => 'string',
                        '0.to'           => 'string',
                        '0.total_budget' => 'double',
                        '0.daily_budget' => 'double',
                        '0.images'       => 'array',
                    ]
                );
            }
        );
    }

    /**
     * @test
     */
    public function user_can_get_one_record()
    {
        $model = Advertising::with('images')
                            ->first()
        ;

        $response = $this->get(
            '/api/advertising/' . $model->id
        );

        $response->assertStatus(200);
        $response->assertJson(
            function (AssertableJson $json) {
                return $json->whereType('name', 'string')
                            ->whereType('from', 'string')
                            ->whereType('to', 'string')
                            ->whereType('total_budget', 'double')
                            ->whereType('daily_budget', 'double')
                            ->whereType('images', 'array')
                    ;
            }
        );
    }
}
