<template>
    <div v-if="invoice">
        <div class="d-flex justify-center my-1">
            <div class="btn-group ">
                <button class="btn btn-sm" @click="closePreview">Close</button>
                <button class="btn btn-sm">Download</button>
                <button class="btn btn-sm" @click="printInvoice">Print</button>
            </div>
        </div>
        <br>
    </div>
    <div id="print">
        <table border="0" cellpadding="0" cellspacing="0" width="100%">
            <!-- start logo -->
            <!-- <tr>
            <td align="center" bgcolor="#D2C7BA">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" valign="top" style="padding: 36px 24px;">
                            <img src="./img/paste-logo-light@2x.png" alt="Logo" border="0" width="48" style="display: block; width: 48px; max-width: 48px; min-width: 48px;">
                        </td>
                    </tr>
                </table>
            </td>
        </tr> -->
            <!-- end logo -->
            <!-- start hero -->
            <tr>
                <td align="center" >
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="center" bgcolor="#ffffff" style="padding: 5mm 5mm 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12pt; ">
                                <hr>
                                <strong>INVOICE</strong>
                                <hr>
                                <!-- <h1 style="margin: 0; font-size: 32px; font-weight: 700; letter-spacing: -1px; line-height: 48px;">Thank you for your order!</h1> -->
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- end hero -->
            <tr>
                <td align="center" >
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" bgcolor="white" style="max-width: 600px;">
                        <tr>
                            <td valign="top" style="padding: 2mm 5mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 11pt;"><strong>To: </strong>
                                <div v-html="invoice.to.replace(/\n/g, ', ')"></div><strong>GST: </strong>{{invoice.gst}}<br><strong>PAN: </strong>{{invoice.pan}}
                            </td>
                            <td valign="top" style="padding: 2mm 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 11pt;"><strong>Place of supply:</strong><br>{{invoice.place}}</td>
                            <td valign="top" style="padding: 2mm 5mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 11pt;"><strong>Invoice No.</strong><br>{{invoice.no}}<br><strong>Date:</strong><br>{{invoice.date}}</td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- start copy block -->
            <tr>
                <td align="center" >
                    <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <!-- start copy -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 2mm 5mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 12pt; line-height: 16pt;">
                                <hr>
                                <p style="margin: 0;">{{invoice.subject}}</p>
                            </td>
                        </tr>
                        <!-- end copy -->
                        <!-- start receipt table -->
                        <tr>
                            <td align="left" bgcolor="#ffffff" style="padding: 5mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; ">
                                <table border="0" cellpadding="0" cellspacing="0" width="100%">
                                    <thead>
                                        <tr>
                                            <th align="left" bgcolor="#ededed" width="5%" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px solid gray; border-bottom: 1px solid gray;">S.No.</th>
                                            <th align="left" bgcolor="#ededed" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px solid gray; border-bottom: 1px solid gray;">Description</th>
                                            <th align="left" width="10%" bgcolor="#ededed" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px solid gray; border-bottom: 1px solid gray;">Time</th>
                                            <th align="left" width="10%" bgcolor="#ededed" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px solid gray; border-bottom: 1px solid gray;">Rate</th>
                                            <th align="left" width="10%" bgcolor="#ededed" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px solid gray; border-bottom: 1px solid gray;">Amount</th>
                                        </tr>
                                    </thead>
                                    <!-- <tr>
                                    <td align="left" bgcolor="#D2C7BA" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>Order #</strong></td>
                                    <td align="left" bgcolor="#D2C7BA" style="padding: 12px;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 16px; line-height: 24px;"><strong>0000224</strong></td>
                                </tr> -->
                                    <tbody>
                                        <tr v-for="(item, index) in invoice.items">
                                            <td align="left" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; ">{{index + 1}}</td>
                                            <td align="left" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; ">{{item.description}}</td>
                                            <td align="left" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; ">{{item.time}}</td>
                                            <td align="left" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; ">{{item.rate}}</td>
                                            <td align="right" style="padding: 1mm 2mm;font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; ">{{item.time * item.rate}}</td>
                                        </tr>
                                    </tbody>
                                    <tfoot>
                                        <tr>
                                            <td style="border-top: 1px dashed gray; "></td>
                                            <td colspan="3" align="left" style="padding: 1mm 2mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px dashed gray; "><strong>Sub total</strong></td>
                                            <td align="right" style="padding: 1mm 2mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 10pt; border-top: 1px dashed gray; "><strong>{{invoice.total}}</strong></td>
                                        </tr>
                                        <!-- <tr>
                                            <td colspan="2"></td>
                                            <td colspan="2" style="padding: 1mm 2mm;">Tax (10%)</td>
                                            <td align="right" style="padding: 1mm 2mm;">-{{invoice.total / 10}}</td>
                                        </tr> -->
                                        <tr>
                                            <td bgcolor="#ededed" style=" border-top: 1px dashed gray; border-bottom: 1px dashed gray;"></td>
                                            <td bgcolor="#ededed" colspan="3" style="padding: 1mm 2mm; font-size: 11pt; border-top: 1px dashed gray; border-bottom: 1px dashed gray;"><strong>Total</strong></td>
                                            <td bgcolor="#ededed" align="right" style="padding: 1mm 2mm; font-size: 11pt; border-top: 1px dashed gray; border-bottom: 1px dashed gray;"><strong>{{invoice.total}}</strong></td>
                                        </tr>
                                    </tfoot>
                                </table>
                            </td>
                        </tr>
                        <!-- end reeipt table -->
                    </table>
                </td>
            </tr>
            <!-- end copy block -->
            <!-- start receipt address block -->
            <tr>
                <td align="center" valign="top" width="100%">
                    <table align="center" bgcolor="#ffffff" border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                        <tr>
                            <td align="left" valign="top" style="padding: 2mm 0 2mm 5mm; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 11pt;">
                                <hr>
                                <strong>From:</strong>
                                <div v-html="invoice.from.replace(/\n/g, ', ')" style="margin-bottom: 1mm;"></div>
                                <strong>Payment Mode </strong>
                                <div style="margin-bottom: 1mm;">{{invoice.payment_mode}}</div>
                                <strong>Mode Detail</strong>
                                <div style="margin-bottom: 1mm;" v-html="invoice.payment_detail.replace(/\n/g, ', ')"></div>
                            </td>
                            <td align="center" valign="top" style="padding: 2mm 5mm 2mm 0; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 11pt;">
                                <hr>
                                <strong>For</strong>
                            </td>
                        </tr>
                        <tr>
                            <td colspan="2" style="padding: 5mm;">
                                <hr>
                            </td>
                        </tr>
                    </table>
                </td>
            </tr>
            <!-- end receipt address block -->
            <!-- start footer -->
            <!-- <tr>
            <td align="center" bgcolor="#D2C7BA" style="padding: 24px;">
                <table border="0" cellpadding="0" cellspacing="0" width="100%" style="max-width: 600px;">
                    <tr>
                        <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">You received this email because we received a request for [type_of_action] for your account. If you didn't request [type_of_action] you can safely delete this email.</p>
                        </td>
                    </tr>
                    <tr>
                        <td align="center" bgcolor="#D2C7BA" style="padding: 12px 24px; font-family: 'Source Sans Pro', Helvetica, Arial, sans-serif; font-size: 14px; line-height: 20px; color: #666;">
                            <p style="margin: 0;">To stop receiving these emails, you can at any time.</p>
                            <p style="margin: 0;">Paste 1234 S. Broadway St. City, State 12345</p>
                        </td>
                    </tr>
                </table>
            </td>
        </tr> -->
            <!-- end footer -->
        </table>
    </div>
</template>
<script>
export default {
    name: "InvoiceTemplate",
    props: {
        invoice: Object,
    },
    data() {
        return {
            invoicedata: { id: "adfgs", from: "adgasdfs", to: "agpisfdiu" }
        };
    },
    methods: {
        closePreview() {
            this.$emit("close-preview")
        },
        /*printInvoice() {
            window.print()
        },*/
        printInvoice() {
            var printwin = window.open("");
            printwin.document.write(document.getElementById("print").innerHTML);
            printwin.stop();
            printwin.print();
            printwin.close();
        }
    }
}
</script>
<style scoped>
h1 {
    font-weight: 500;
    font-size: 2rem;
    /*top: -10px;*/
}

h4 {
    font-size: 1.1rem;
}

body {
    font-family: 'Source Sans Pro', sans-serif;
}

hr {
    margin-top: 10px;
    margin-bottom: 10px;
}

/**
   * Avoid browser level font resizing.
   * 1. Windows Mobile
   * 2. iOS / OSX
   */
body,
table,
td,
a {
    -ms-text-size-adjust: 100%;
    /* 1 */
    -webkit-text-size-adjust: 100%;
    /* 2 */
}

/**
   * Remove extra space added to tables and cells in Outlook.
   */
table,
td {
    mso-table-rspace: 0pt;
    mso-table-lspace: 0pt;
}

/**
   * Better fluid images in Internet Explorer.
   */
img {
    -ms-interpolation-mode: bicubic;
}

/**
   * Remove blue links for iOS devices.
   */
a[x-apple-data-detectors] {
    font-family: inherit !important;
    font-size: inherit !important;
    font-weight: inherit !important;
    line-height: inherit !important;
    color: inherit !important;
    text-decoration: none !important;
}

body {
    width: 100%;
    height: 100%;
    padding: 0;
    margin: 0;
}

/**
   * Collapse table borders to avoid space between cells.
   */
table {
    border-collapse: collapse !important;
}

a {
    color: #1a82e2;
}

img {
    height: auto;
    line-height: 100%;
    text-decoration: none;
    border: 0;
    outline: none;
}

@media print {
    body * {
        visibility: hidden;
    }

    #print * {
        visibility: visible;
    }

    #print { position: absolute; top: 0; left: 0; }

}
</style>