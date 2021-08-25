require 'rails_helper'

describe AuthenticationTokenService do
    describe '.call' do
        let(:token) { described_class.call('123') }
        it 'returns an authetication token' do
            hmac_secret = described_class::HMAC_SECRET
            
            decoded_token = JWT.decode(
                 token,
                  hmac_secret,
                   true, { algorithm: described_class::ALGORITHM_TYPE }
            )

            expect(decoded_token).to eq([
                {"account_id" => "123"},
                {"alg" => "HS256"}
            ])
        end
    end

    describe '.decode' do
        let(:token) { described_class.call('123') }
        it 'returns account id after decoding token' do
            decoded_token = described_class.decode(token)
            expect(decoded_token).to eq('123')
        end
    end
end