<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AdvertisingImage extends Model
{
    use HasFactory;

    protected $fillable = [
        'image_id',
        'advertising_id'
    ];
}
