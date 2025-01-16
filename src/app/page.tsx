import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import React from 'react';

function Homepage() {
  return (
    <div className="p-5 flex flex-col gap-5 w-max">
      <h1>Homepage</h1>
      <Button>Shadcn Button</Button>

      <Input placeholder="Enter your name" />
    </div>
  );
}

export default Homepage;
