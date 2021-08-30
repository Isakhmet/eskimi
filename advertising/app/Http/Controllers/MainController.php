<?php

namespace App\Http\Controllers;

use App\Models\Advertising;
use App\Models\AdvertisingImage;
use App\Models\Image;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Illuminate\Http\UploadedFile;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Storage;

class MainController extends Controller
{
    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return array|bool[]
     */
    public function removeAllImages(Request $request)
    {
        try {
            foreach ($request->get('images') as $image) {
                AdvertisingImage::where('advertising_id', $request->get('id'))
                                ->where('image_id', $image['id'])
                                ->delete()
                ;
            }

            return [
                'success' => true,
            ];
        } catch (\Exception $exception) {
            return [
                'success' => false,
                'message' => $exception->getMessage(),
            ];
        }
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return array|bool[]
     */
    public function removeImages(Request $request)
    {
        try {
            AdvertisingImage::where('advertising_id', $request->get('id'))
                            ->where('image_id', $request->get('image_id'))
                            ->delete()
            ;

            return [
                'success' => true,
            ];
        } catch (\Exception $exception) {
            return [
                'success' => false,
                'message' => $exception->getMessage(),
            ];
        }
    }

    /**
     * @param $id
     *
     * @return array
     */
    public function getOne($id)
    {
        $data = [];

        try {
            $model = Advertising::with('images')
                                ->where('id', $id)
                                ->get()
            ;

            if ($model->count() > 0) {
                $advertising = $model->toArray();

                $data['name']         = $advertising[0]['name'];
                $data['from']         = Carbon::createFromTimeString($advertising[0]['from'])
                                              ->format('Y-m-d\TH:i:s')
                ;
                $data['to']           = Carbon::createFromTimeString($advertising[0]['to'])
                                              ->format('Y-m-d\TH:i:s')
                ;
                $data['total_budget'] = $advertising[0]['total_budget'];
                $data['daily_budget'] = $advertising[0]['daily_budget'];
                $data['images']       = $advertising[0]['images'];
            }
        } catch (\Exception $exception) {

        }

        return $data;
    }

    /**
     * @return array
     */
    public function getAll(): array
    {
        $advertising = [];

        try {
            $model = Advertising::with('images')
                                ->get()
            ;

            if ($model->count() > 0) {
                $advertising = $model->toArray();
            }
        } catch (\Exception $exception) {

        }

        return $advertising;
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return array|bool[]
     */
    public function create(Request $request)
    {
        try {
            $from        = Carbon::createFromTimeString($request->get('from'));
            $to          = Carbon::createFromTimeString($request->get('to'));
            $advertising = Advertising::create(
                [
                    'name'         => $request->get('name'),
                    'from'         => $from->format('Y-m-d H:i:s'),
                    'to'           => $to->format('Y-m-d H:i:s'),
                    'total_budget' => $request->get('totalBudget'),
                    'daily_budget' => $request->get('dailyBudget'),
                ]
            );

            Log::info('create data: ', $request->toArray());

            if (!empty($request->allFiles())) {
                foreach ($request->allFiles() as $key => $file) {
                    Storage::putFileAs('public/images', $file, $file->getClientOriginalName());
                    $image = Image::create(
                        [
                            'name' => $file->getClientOriginalName(),
                            'path' => 'storage/images/' . $file->getClientOriginalName(),
                        ]
                    );

                    AdvertisingImage::create(
                        [
                            'image_id'       => $image->id,
                            'advertising_id' => $advertising->id,
                        ]
                    );
                }
            }

            return [
                'success' => true,
            ];
        } catch (\Exception $exception) {
            return [
                'success' => false,
                'message' => $exception->getMessage(),
            ];
        }
    }

    /**
     * @param \Illuminate\Http\Request $request
     *
     * @return array|bool[]
     */
    public function update(Request $request)
    {
        try {
            $from = Carbon::createFromTimeString($request->get('from'));
            $to   = Carbon::createFromTimeString($request->get('to'));

            Advertising::where('id', $request->get('id'))
                       ->update(
                           [
                               'name'         => $request->get('name'),
                               'from'         => $from->format('Y-m-d H:i:s'),
                               'to'           => $to->format('Y-m-d H:i:s'),
                               'total_budget' => $request->get('totalBudget'),
                               'daily_budget' => $request->get('dailyBudget'),
                           ]
                       )
            ;

            foreach ($request->allFiles() as $key => $file) {
                Storage::putFileAs('public/images', $file, $file->getClientOriginalName());
                $image = Image::create(
                    [
                        'name' => $file->getClientOriginalName(),
                        'path' => 'storage/images/' . $file->getClientOriginalName(),
                    ]
                );

                AdvertisingImage::create(
                    [
                        'image_id'       => $image->id,
                        'advertising_id' => $request->get('id'),
                    ]
                );
            }

            return [
                'success' => true,
            ];
        } catch (\Exception $exception) {
            Log::error($exception);

            return [
                'success' => false,
                'message' => $exception->getMessage(),
            ];
        }
    }
}
