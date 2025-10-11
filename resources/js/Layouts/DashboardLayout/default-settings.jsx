import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"

export default function DefaultSettings() {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-sm font-medium mb-3">Appearance</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="compact-mode">Compact Mode</Label>
            <Switch id="compact-mode" />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="animations">Animations</Label>
            <Switch id="animations" defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-3">Notifications</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="email-notif">Email Notifications</Label>
            <Switch id="email-notif" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="push-notif">Push Notifications</Label>
            <Switch id="push-notif" />
          </div>
        </div>
      </div>

      <Separator />

      <div>
        <h3 className="text-sm font-medium mb-3">Privacy</h3>
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="analytics">Analytics</Label>
            <Switch id="analytics" defaultChecked />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="cookies">Cookies</Label>
            <Switch id="cookies" defaultChecked />
          </div>
        </div>
      </div>

      <Separator />

      <Button className="w-full">Save Changes</Button>
    </div>
  )
}
