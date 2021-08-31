<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Advertising extends Model
{
    protected $table = 'advertising';

    protected $fillable = [
        'name',
        'from',
        'to',
        'total_budget',
        'daily_budget',
    ];

    public function images()
    {
        return $this->hasManyThrough(
            Image::class,
            AdvertisingImage::class,
            'advertising_id',
            'id',
            'id',
            'image_id');
    }
}
