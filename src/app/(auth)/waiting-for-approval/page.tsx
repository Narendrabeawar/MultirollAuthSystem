export default function WaitingForApprovalPage() {
  return (
    <div className="min-h-[60vh] flex flex-col items-center justify-center text-center p-8">
      <h1 className="text-3xl font-bold mb-2">Approval pending</h1>
      <p className="text-muted-foreground max-w-xl">
        Your account has been registered successfully and is awaiting admin approval. You will be able to access your dashboard once an admin approves your account.
      </p>
    </div>
  )
}
