import { Injectable, Scope } from '@nestjs/common';
import axios from 'axios';
import * as convert from 'xml-js';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

@Injectable({
  scope: Scope.TRANSIENT,
})
export class MailService {
  private mail_api = process.env.MAIL_GATEWAY;

  constructor() {}

  async sendEmail(email: string, token: string, type: string): Promise<any> {
    // Define the parameters for the SOAP request
    const params = {
      to: email,
      appcode: 'AP1607001',
      from: 'auto-response@equity.id',
      status: 'Aktif',
      jenis: type,
      content: token,
    };

    switch (type.toLowerCase()) {
      case 'reset password':
        this.mail_api = `${process.env.MAIL_GATEWAY}sendmailexternal.php`;
        break;
      case 'request account':
        this.mail_api = `${process.env.MAIL_GATEWAY}sendmailexternalact.php`;
        break;
      default:
    }

    // Convert the parameters to SOAP XML format
    const soapRequest = `<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:web="${
      process.env.MAIL_GATEWAY
    }/?sendEmailWSDL">
    <soapenv:Header/>
        <soapenv:Body>
            <web:post_Email>
                ${Object.entries(params)
                  .map(([key, value]) => `<web:${key}>${value}</web:${key}>`)
                  .join('')}
            </web:post_Email>
        </soapenv:Body>
    </soapenv:Envelope>`;

    return axios
      .post(this.mail_api, soapRequest, {
        headers: {
          'Content-Type': 'text/xml',
          SOAPAction: '#post_Email',
        },
      })
      .then((response) => {
        // Parse the SOAP response
        const xml = response.data;
        const jsonResponse = convert.xml2json(xml, {
          compact: true,
          spaces: 4,
        });

        // Extract the desired information from the SOAP response
        const resultValue =
          JSON.parse(jsonResponse)['SOAP-ENV:Envelope']['SOAP-ENV:Body'][
            'ns1:post_EmailResponse'
          ].output.mail._text;
        // Use resultValue as needed
        return resultValue;
      })
      .catch((error) => {
        throw new Error(error);
      });
  }
}
