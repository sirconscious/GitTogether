<?php

namespace App\Console\Commands;

use App\Events\MessageEvent;
use Illuminate\Console\Command;

class sendMessage extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'send:message {--message=} {--receiver_id=}';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Command description';

    /**
     * Execute the console command.
     */
    public function handle()
    {
        $message = $this->option('message');
        $receiver_id = $this->option('receiver_id');

        event(new MessageEvent([
            'message' => $message,
            'receiver_id' => $receiver_id
        ]));

        $this->info('Message sent successfully!');
        return 0;
    }
}
