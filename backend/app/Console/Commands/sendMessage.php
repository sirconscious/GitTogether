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
    protected $signature = 'send:message {--content=} {--reciverId=} {--senderId=}';

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
        $content = $this->option('content');
        $reciverId = $this->option('reciverId');
        $senderId = $this->option("senderId") ;
        event(new MessageEvent([
            'content' => $content,
            'reciverId' => $reciverId , 
            'senderId' => $senderId
        ]));

        $this->info('Message sent successfully!');
        return 0;
    }
}
