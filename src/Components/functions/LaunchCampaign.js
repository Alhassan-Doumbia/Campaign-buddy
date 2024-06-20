
import { SmsOrange } from 'smsorange'
async function LaunchCampaign(PhoneNumberArray,phoneNumber) {
    const smsWrapper = new SmsOrange(
        {authorization_header:"<Your Authorization header>",
        yourNumber: `${phoneNumber}`,
        senderName: "<Sender Name or Service Name>"}
    )
    const response=await smsWrapper.sendSms({numberTo:PhoneNumberArray});
    

  }