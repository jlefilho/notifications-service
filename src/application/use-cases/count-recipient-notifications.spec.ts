import { Notification } from "@application/entities/notification";
import { Content } from "@application/entities/notification-content";
import { InMemoryNotificationsRepository } from "@test/repositories/in-memory-notifications-repository"
import { CountRecipientNotifications } from "./count-recipient-notifications";

describe('Count recipient notifications', () => {
    it('should be able to count recipient notifications', async () => {
        const notificationsRepository = new InMemoryNotificationsRepository();
        const countNotification = new CountRecipientNotifications(notificationsRepository);

        await notificationsRepository.create(new Notification({
            content: new Content('Nova notificação'),
            category: 'social',
            recipientId: 'recipient-1',
        }));

        await notificationsRepository.create(new Notification({
            content: new Content('Nova notificação 2'),
            category: 'social',
            recipientId: 'recipient-1',
        }));

        await notificationsRepository.create(new Notification({
            content: new Content('Nova notificação'),
            category: 'social',
            recipientId: 'recipient-2',
        }));

        const { count } = await countNotification.execute({
            recipientId: 'recipient-1'
        })

        expect(count).toEqual(2);
    })
    
})