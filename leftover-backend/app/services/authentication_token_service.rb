class AuthenticationTokenService
    HMAC_SECRET = 'willbeinenvironment'
    ALGORITHM_TYPE = 'HS256'

    def self.call(account_id)
        payload = { account_id: account_id }
        JWT.encode payload, HMAC_SECRET, ALGORITHM_TYPE
    end

    def self.decode(token)
        payload = JWT.decode(
            token,
             HMAC_SECRET,
              true, { algorithm: ALGORITHM_TYPE }
       )
       payload[0]['account_id']
    end
end
