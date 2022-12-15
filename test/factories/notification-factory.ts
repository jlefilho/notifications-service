import { Notification, NotificationProps } from "@application/entities/notification";
import { Content } from "@application/entities/notification-content";

type Override = Partial<NotificationProps>

export function makeNotification(override: Override = {}) {
    return new Notification({
        content: new Content('Nova notificação'),
        category: 'example-category',
        recipientId: 'example-recipient-id',
        ...override
    })
}