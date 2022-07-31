import { error5xx } from "config";
import type { BookingFormPropsT } from "typings/mixTypes";
import createHtmlInputDateTimeValue from "utils/createHtmlInputDateTimeValue";

export default function BookingForm({
  handleSubmit,
  loading,
  error,
  callOn,
  message,
  recipientLine,
}: BookingFormPropsT) {
  // callOn fix: if value is undefined before mount pass 0
  const callOnDateTime = createHtmlInputDateTimeValue(+callOn! || 0);
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label>
          Recipient Line:
          <div>
            <input
              name="recipientLine"
              placeholder="Recipient line eg 080XX"
              type="tel"
              defaultValue={recipientLine}
              required
            />
          </div>
        </label>
        <br />
        <label>
          Message:
          <div>
            <textarea
              rows={4}
              name="message"
              placeholder="Message"
              defaultValue={message}
              required
            />
          </div>
        </label>
        <br />
        <div>
          <label>
            Date and Time
            <div>
              <input
                name="callOn"
                type="datetime-local"
                defaultValue={callOnDateTime}
                required
              />
            </div>
          </label>
        </div>
        <br />
        <div>
          <button disabled={loading}>
            {loading ? <i>wait...</i> : "Submit"}
          </button>
        </div>
        <br />
        <i>{error && error5xx}</i>
      </form>
    </div>
  );
}
