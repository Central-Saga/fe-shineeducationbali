"use client";

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { MessageSquare, Paperclip, Send, Reply, ChevronDown, ChevronUp } from 'lucide-react';
import { ClassDiscussionMessage } from '@/data/data-student/class-detail-data';

interface ClassDiscussionProps {
  discussion: ClassDiscussionMessage[];
}

export function ClassDiscussion({ discussion }: ClassDiscussionProps) {
  const [newMessage, setNewMessage] = useState("");
  const [expandedReplies, setExpandedReplies] = useState<Record<string, boolean>>({});

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('id-ID', {
      day: 'numeric',
      month: 'long',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const toggleReplies = (messageId: string) => {
    setExpandedReplies(prev => ({
      ...prev,
      [messageId]: !prev[messageId]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Here we would handle submission of a new message
      // For now, just clear the input
      setNewMessage("");
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <MessageSquare className="h-5 w-5 text-[#C40503]" />
          Diskusi Kelas
        </CardTitle>
      </CardHeader>
      <CardContent>
        {discussion.length > 0 ? (
          <div className="space-y-6">
            {discussion.map((message) => (
              <div key={message.id} className="border-b border-gray-100 pb-6 last:border-0 last:pb-0">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    {message.userAvatar ? (
                      <img 
                        src={message.userAvatar} 
                        alt={message.userName} 
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      <div className="w-10 h-10 rounded-full bg-[#C40503] text-white flex items-center justify-center">
                        {message.userName.charAt(0)}
                      </div>
                    )}
                  </div>
                  <div className="flex-grow">
                    <div className="flex items-center mb-1">
                      <h4 className="font-medium text-gray-800 mr-2">{message.userName}</h4>
                      <span className="text-xs text-gray-500">{formatDate(message.timestamp)}</span>
                    </div>
                    <p className="text-gray-700 mb-3">{message.content}</p>
                    
                    {message.attachments && message.attachments.length > 0 && (
                      <div className="mb-3 bg-gray-50 p-3 rounded">
                        <p className="text-xs text-gray-500 mb-2">Lampiran:</p>
                        <div className="space-y-2">
                          {message.attachments.map((attachment) => (
                            <div key={attachment.id} className="flex items-center gap-2">
                              <Paperclip className="h-3 w-3 text-gray-400" />
                              <a 
                                href={attachment.url} 
                                className="text-sm text-[#C40503] hover:underline"
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {attachment.name}
                              </a>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                    
                    <div className="flex items-center gap-4">
                      <button className="text-xs text-gray-500 flex items-center gap-1 hover:text-[#C40503]">
                        <Reply className="h-3 w-3" />
                        Balas
                      </button>
                      
                      {message.replies && message.replies.length > 0 && (
                        <button 
                          className="text-xs text-gray-500 flex items-center gap-1 hover:text-[#C40503]"
                          onClick={() => toggleReplies(message.id)}
                        >
                          {expandedReplies[message.id] ? (
                            <>
                              <ChevronUp className="h-3 w-3" />
                              Sembunyikan {message.replies.length} balasan
                            </>
                          ) : (
                            <>
                              <ChevronDown className="h-3 w-3" />
                              Lihat {message.replies.length} balasan
                            </>
                          )}
                        </button>
                      )}
                    </div>
                    
                    {message.replies && message.replies.length > 0 && expandedReplies[message.id] && (
                      <div className="mt-4 space-y-4 pl-4 border-l-2 border-gray-100">
                        {message.replies.map((reply) => (
                          <div key={reply.id} className="flex gap-3">
                            <div className="flex-shrink-0">
                              {reply.userAvatar ? (
                                <img 
                                  src={reply.userAvatar} 
                                  alt={reply.userName} 
                                  className="w-8 h-8 rounded-full"
                                />
                              ) : (
                                <div className="w-8 h-8 rounded-full bg-[#DAA625] text-white flex items-center justify-center text-sm">
                                  {reply.userName.charAt(0)}
                                </div>
                              )}
                            </div>
                            <div>
                              <div className="flex items-center mb-1">
                                <h4 className="font-medium text-gray-800 mr-2 text-sm">{reply.userName}</h4>
                                <span className="text-xs text-gray-500">{formatDate(reply.timestamp)}</span>
                              </div>
                              <p className="text-gray-700 text-sm">{reply.content}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-8">
            <p className="text-gray-500">Belum ada diskusi</p>
            <p className="text-sm text-gray-400">Mulai diskusi dengan mengirim pesan</p>
          </div>
        )}
      </CardContent>
      <CardFooter>
        <form onSubmit={handleSubmit} className="w-full">
          <div className="relative">
            <Textarea 
              placeholder="Tulis pesan..." 
              className="resize-none pr-20"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
            />
            <div className="absolute right-3 bottom-3 flex items-center gap-2">
              <Button 
                type="button" 
                size="icon"
                variant="ghost"
                className="h-8 w-8"
              >
                <Paperclip className="h-4 w-4" />
              </Button>
              <Button 
                type="submit" 
                size="icon" 
                className="h-8 w-8 bg-[#C40503] hover:bg-[#a60402]"
                disabled={!newMessage.trim()}
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </form>
      </CardFooter>
    </Card>
  );
}
