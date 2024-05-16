import { View, Text, StyleSheet, ScrollView } from 'react-native';
import React from 'react';
import CommonHeader from '../../components/common/commonHeader/CommonHeader';
import { Color, Font } from '../../constants/GlobalStyle';

const PrivacyPolicy = () => {
  const lastUpdated = '25 April 2024';
  return (
    <View style={{ flex: 1, backgroundColor: Color.C_white }}>
      <CommonHeader title="Privacy Policy" cartBox={false} />
      <ScrollView>
        <View style={{ padding: 20 }}>
          <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 10 }}>
            Privacy Policy of Q-Print
          </Text>
          <Text style={{ marginBottom: 10, fontStyle: 'italic' }}>Last updated: {lastUpdated}</Text>

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Introduction</Text>
          <Text>
            Welcome to Q-Print, your trusted source for printers and printer cartridges. We are
            committed to protecting the privacy of our customers and ensuring the security of their
            personal information. This Privacy Policy details how we collect, use, and safeguard the
            information you provide when you use our website and services.
          </Text>

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Information We Collect</Text>
          <Text style={{ marginBottom: 10 }}>
            Personal Information: We collect your name, contact information (such as email address
            and phone number), shipping address, and billing information when you make a purchase or
            create an account.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Purchase Information: Details of the products you buy, including types of cartridges and
            printers, quantities, and prices.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Payment Information: Credit card numbers and other payment details, processed securely
            through our payment gateway providers.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Usage Information: Data about how you interact with our website, including browsing
            patterns, device information, and IP addresses.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Customer Service Interactions: Records of communications between you and our customer
            service team for order tracking and quality assurance.
          </Text>

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>How We Use Your Information</Text>
          <Text style={{ marginBottom: 10 }}>
            Order Processing: To fulfill orders, manage transactions, send order confirmations, and
            deliver products.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Customer Support: To provide support, handle inquiries, and resolve issues related to
            orders or products.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Marketing and Promotions: To inform you about new products, special offers, and
            promotions, in line with your preferences.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Website Improvement: To enhance our website functionality, improve user experience, and
            optimize our service offerings.
          </Text>

          <Text style={{ marginTop: 20, fontWeight: 'bold' }}>Sharing of Information</Text>
          <Text style={{ marginBottom: 10 }}>
            Service Providers: We may share information with third-party service providers to
            facilitate services like shipping, payment processing, and website hosting.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Compliance and Safety: We may disclose information if required by law or to protect the
            rights, property, or safety of our business, our customers, or others.
          </Text>
          <Text style={{ marginBottom: 10 }}>
            Business Transfers: In the event of a merger, acquisition, or asset sale, customer
            information may be transferred as part of the transaction.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PrivacyPolicy;
const styles = StyleSheet.create({
  body: {
    padding: 10,
  },
  title: {
    fontSize: Font.Font_L,
    fontWeight: '600',
  },
});
