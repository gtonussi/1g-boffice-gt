"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { useUser } from "@/hooks/useUser";
import { useEffect } from "react";

const FormSchema = z.object({
  id: z.number(),
  email: z.string().email(),
  first_name: z.string().min(2, {
    message: "First name must be at least 2 characters.",
  }),
  last_name: z.string().min(2, {
    message: "Last name must be at least 2 characters.",
  }),
  avatar: z.string().url(),
});

export function UserForm({ user }: { user: z.infer<typeof FormSchema> | null }) {
  const { createUser, updateUser } = useUser();

  const mutation = user ? updateUser : createUser;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      id: Math.ceil(Math.random() * 1000),
      email: "",
      first_name: "",
      last_name: "",
      avatar: "https://i.pravatar.cc/150?img=1",
    },
  });

  function onSubmit(data: z.infer<typeof FormSchema>) {
    mutation.mutate(data, {
      onSuccess: () => {
        form.reset();
        toast.success("You submitted the following values:", {
          description: (
            <p>
              {JSON.stringify(
                { Email: data.email, "First Name": data.first_name, "Last Name": data.last_name },
                null,
                2,
              )}
            </p>
          ),
        });
      },
      onError: (error) => {
        form.reset();
        toast.error(`Failed to create user: ${error.message}`);
      },
    });
  }

  useEffect(() => {
    if (user) {
      form.reset(user);
    }
  }, [user, form]);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">
        <FormField
          control={form.control}
          name="first_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="First name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="last_name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Last name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input type="email" placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}
